import React, { useState } from "react";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { FaCircleUser, FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";

import { FaBitcoin } from "react-icons/fa6";
import {
  HeaderCellSelect,
  CellSelect,
  SelectTypes,
} from "@table-library/react-table-library/select";
import { useTheme } from "@table-library/react-table-library/theme";
import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import MaterialCheckbox from "@mui/material/Checkbox";
import { FaCheck } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

export default function TableList({
  data,
  removeSynergy,
  updateSynergy,
  setSynergyN,
  setSynergyC,
  setSynergyP,
  synergyN,
  synergyC,
  synergyP,
  isSelected,
  select,
}) {
  const [update, setUpdate] = useState(false);
  const [selectedSynergy, setSelectedSynergy] = useState("");

  const handleUpdate = (id, synergy) => {
    setSynergyN(synergy.synergyName);
    setSynergyC(synergy.creator);
    setSynergyP(synergy.price);

    setUpdate(!update);
    setSelectedSynergy(id);
    const newSynergy = {
      ...synergy,
      synergyName: synergyN,
      creator: synergyC,
      price: synergyP,
    };

    updateSynergy(id, newSynergy);
  };

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns: auto auto 15% auto 23% auto auto;
      `,
  });

  // const customCheckboxStyle = {
  //   height: "1em",
  //   width: "1em",
  //   border: '.5px solid #848483',
  //   borderRadius: '1px',
  // };

  return (
    <MaterialThemeProvider
      theme={createMaterialTheme({
        palette: {
          primary: {
            main: "#d0ab89",
          },
          secondary: {
            main: "#e0e0e0",
          },
        },
      })}
    >
      <div className="bg-color">
        <Table
          data={data}
          theme={theme}
          layout={{ custom: true }}
          className="table-container"
          select={select}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow className="table-header">
                  <HeaderCell className="left">Synergy Name</HeaderCell>
                  <HeaderCell>Creator</HeaderCell>
                  <HeaderCell>Image</HeaderCell>
                  <HeaderCell>Price</HeaderCell>
                  <HeaderCell>Synergies Angels</HeaderCell>
                  <HeaderCell>Date</HeaderCell>
                  <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
              </Header>

              <Body className="table-body">
                {tableList.map((item) => (
                  <Row key={item.key} item={item}>
                    {/* <CellSelect
                      item={item}
                      type={SelectTypes.ROW}
                    /> */}
                    <Cell stiff className="left">
                      <div style={{ color: "var(--syn-table-name)" }}>
                        <MaterialCheckbox
                          color="primary"
                          icon={<div className="check-icon" />}
                          checkedIcon={
                            <div className="check-icon">
                              <FaCheck />
                            </div>
                          }
                          inputProps={{ "aria-label": "select item" }}
                          size="small"
                          // style={customCheckboxStyle}
                          checked={select.state.ids.includes(item.id)}
                          onChange={() => select.fns.onToggleById(item.id)}
                        />

                        {/* if update is true, we want to set the selected synergies "Cells" to inputs so we can now edit the content in there */}
                        {update && selectedSynergy === item.key ? (
                          <input
                            type="text"
                            placeholder={item.synergyName}
                            value={synergyN}
                            onChange={(e) => {
                              setSynergyN(e.target.value);
                            }}
                          />
                        ) : (
                          <>{item.synergyName}</>
                        )}
                      </div>
                    </Cell>

                    {update && selectedSynergy === item.key ? (
                      <Cell>
                        <input
                          type="text"
                          placeholder={item.creator}
                          value={synergyC}
                          onChange={(e) => {
                            setSynergyC(e.target.value);
                          }}
                        />
                      </Cell>
                    ) : (
                      <Cell className="creator-column">
                        <div className="creator-column-wrap">
                          <div className="creator-image-wrap">
                            {/* <FaCircleUser color={"var(--text-gray)"} /> */}
                            {item.creatorImage ? (
                              <img
                                className="creator-image"
                                src={item.creatorImage}
                                alt="Creator Image"
                              />
                            ) : (
                              <FaCircleUser color={"var(--text-gray)"} />
                            )}
                          </div>

                          {item.creator}
                        </div>
                      </Cell>
                    )}

                    <Cell>
                      {item.image && item.image.endsWith(".png") ? (
                        <img
                          className="synergy-image"
                          src={item.image}
                          alt="Synergy Image"
                        />
                      ) : null}
                    </Cell>

                    {/* <Cell>{item.price}</Cell> */}

                    {update && selectedSynergy === item.key ? (
                      <Cell>
                        <input
                          type="text"
                          placeholder={item.price}
                          value={synergyP}
                          onChange={(e) => {
                            setSynergyP(e.target.value);
                          }}
                        />
                      </Cell>
                    ) : (
                      <Cell className="price-column">
                        <FaBitcoin /> {item.price}
                      </Cell>
                    )}

                    {/* <Cell>{item.angels}</Cell> */}
                    {/* We need to map over angels because its an array containing names */}

                    <Cell>
                      <div className="angels-container">
                        {item.angels.map((angel) => (
                          <p key={angel}>
                            <TbWorld /> {angel}
                          </p>
                        ))}
                      </div>
                    </Cell>

                    <Cell className="date-column">{item.date}</Cell>

                    <Cell>
                      <div className="action-container">
                        <button
                          className="table-button pen"
                          onClick={() => handleUpdate(item.key, item)}
                        >
                          <svg
                            width="1.2em"
                            height="1.2em"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.2594 3.6L5.04936 12.29C4.73936 12.62 4.43936 13.27 4.37936 13.72L4.00936 16.96C3.87936 18.13 4.71936 18.93 5.87936 18.73L9.09936 18.18C9.54936 18.1 10.1794 17.77 10.4894 17.43L18.6994 8.74C20.1194 7.24 20.7594 5.53 18.5494 3.44C16.3494 1.37 14.6794 2.1 13.2594 3.6Z"
                              stroke="#F5EFDB"
                              strokeWidth={1.5}
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.8906 5.04999C12.3206 7.80999 14.5606 9.91999 17.3406 10.2"
                              stroke="#F5EFDB"
                              strokeWidth={1.5}
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 22H21"
                              stroke="#F5EFDB"
                              strokeWidth={1.5}
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="table-button trash"
                          onClick={() => removeSynergy(item.key)}
                        >
                          <svg
                            width="1.2em"
                            height="1.2em"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 5.98001C17.67 5.65001 14.32 5.48001 10.98 5.48001C9 5.48001 7.02 5.58001 5.04 5.78001L3 5.98001"
                              stroke="#FF9E98"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                              stroke="#FF9E98"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.8504 9.14001L18.2004 19.21C18.0904 20.78 18.0004 22 15.2104 22H8.79039C6.00039 22 5.91039 20.78 5.80039 19.21L5.15039 9.14001"
                              stroke="#FF9E98"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.3301 16.5H13.6601"
                              stroke="#FF9E98"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.5 12.5H14.5"
                              stroke="#FF9E98"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </MaterialThemeProvider>
  );
}
