import React, { useCallback, useContext, useEffect, useState } from "react";
import { synCtx } from "../../context/context";
import "./SynTable.css";
import SynergyNav from "./SynergyNav";
import AddSynergy from "./AddSynergy";
import FilterSyn from "./FilterSyn";
import TableList from "./TableList";
import SynTableSearch from "./SynTableSearch";
import { useRowSelect } from "@table-library/react-table-library/select";
import { IoIosArrowBack, IoMdArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { usePagination } from "@table-library/react-table-library/pagination";
import { IoIosArrowDown } from "react-icons/io";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SynTable = () => {
  const { dbData, removeSynergy, updateSynergy } = useContext(synCtx);
  const [search, setSearch] = useState("");
  const [addSynergy, setAddSynergy] = useState(false);
  const [synergyN, setSynergyN] = useState("");
  const [synergyC, setSynergyC] = useState("");
  const [synergyP, setSynergyP] = useState("");
  const [data, setData] = useState({
    nodes:
      dbData.synergies.filter(
        (synergy) =>
          synergy.synergyName.toLowerCase().includes(search.toLowerCase()) ||
          synergy.creator.toLowerCase().includes(search.toLowerCase())
      ) || [],
  });
  const [filter, setFilter] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Default page size
  const totalPages = Math.ceil(data.nodes.length / pageSize);

  const LIMIT = 8; // You can adjust the limit as needed

  const doGet = useCallback(
    async (params) => {
      setData({
        nodes:
          dbData.synergies
            .filter(
              (synergy) =>
                synergy.synergyName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                synergy.creator.toLowerCase().includes(search.toLowerCase())
            )
            .slice(params.offset, params.offset + params.limit) || [],
      });
    },
    [dbData, search]
  );

  useEffect(() => {
    doGet({
      offset: 0,
      limit: LIMIT,
    });
  }, [doGet]);

  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: LIMIT,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    }
  );

  function onPaginationChange(action, state) {
    doGet({
      offset: state.page * LIMIT,
      limit: LIMIT,
    });
  }

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const isSelected = (id) => {
    return select.state.ids.includes(id);
  };

  useEffect(() => {
    setData({
      nodes:
        dbData.synergies.filter(
          (synergy) =>
            synergy.synergyName.toLowerCase().includes(search.toLowerCase()) ||
            synergy.creator.toLowerCase().includes(search.toLowerCase())
        ) || [],
    });
  }, [dbData, search]);

  useEffect(() => {
    function handleFilter(filter) {
      setData({
        nodes: dbData.synergies.filter((synergy) => {
          if (filter.type === "creator") {
            if (filter.value !== "All") {
              return synergy.creator === filter.value;
            } else {
              return true;
            }
          } else if (filter.type === "price") {
            return (
              synergy.price >= filter.value.min &&
              synergy.price <= filter.value.max
            );
          }
          return true;
        }),
      });
    }
    handleFilter(filter);
  }, [filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.nodes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <SynTableSearch
        search={search}
        setSearch={setSearch}
        setData={setData}
        dbData={dbData}
      />
      {showFilter ? <FilterSyn setFilter={setFilter} /> : null}
      {addSynergy && <AddSynergy setAddSynergy={setAddSynergy} />}
      <SynergyNav
        setAddSynergy={setAddSynergy}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />
      <TableList
        data={{ nodes: paginatedData }}
        removeSynergy={removeSynergy}
        updateSynergy={updateSynergy}
        setSynergyN={setSynergyN}
        setSynergyC={setSynergyC}
        setSynergyP={setSynergyP}
        synergyC={synergyC}
        synergyN={synergyN}
        synergyP={synergyP}
        isSelected={isSelected}
        select={select}
      />
      {/* <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowAltCircleLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowCircleRight />
        </button>
      </div> */}
      <div className="table-footer-bg-wrap">
      <div className="table-footer-wrap">
      {data.nodes.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            backgroundColor: "var(--nav-bg-color)",
            padding: "2%",
            color: "var(--text-gray)",
            borderRadius: "0 0 1% 1%",
            borderTop: ".5px solid var(--synergies-border)",
            padding: "1%",
          }}
        >
          <span>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            Rows per page:
            {/* <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="plain-select">
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select> */}
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                label="Rows per page"
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={32}>32</MenuItem>
              </Select>
            </FormControl>
            <div style={{ color: "white" }}>
            {pagination.state.size}
            {"-"}
            {Math.min(
              pagination.state.size * (pagination.state.page + 1),
              dbData.synergies.length
            )}
            {" of "}
            {dbData.synergies.length}
            </div>
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page - 1)
              }
              style={{
                backgroundColor: "var(--nav-bg-color)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <IoIosArrowBack color="white" />
            </button>
            <button
              type="button"
              disabled={
                pagination.state.page + 1 ===
                Math.ceil(dbData.synergies.length / LIMIT)
              }
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page + 1)
              }
              style={{
                backgroundColor: "var(--nav-bg-color)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <IoIosArrowForward color="white" />
            </button>
            </div>
          </span>
        </div>
      )}
      </div>
      </div>
    </>
  );
};

export default SynTable;
