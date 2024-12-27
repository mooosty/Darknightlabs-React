import { useNavigate } from 'react-router-dom';
import { SocietyCard } from '../../../components'
import './societyFullList.scss'
import { MembersImage1, MembersImage10, MembersImage11, MembersImage2, MembersImage3, MembersImage4, MembersImage5, MembersImage6, MembersImage7, MembersImage8, MembersImage9 } from '../../../utils/constants/images';

const societyCardData = [

    {
        name: 'Mirko Basil Dölger',
        post: 'CEO Owned.gg',
        img: MembersImage1
    },

    {
        name: 'JR Walker',
        post: 'Sony',
        img: MembersImage2
    },

    {
        name: 'Petr Martynov',
        post: 'Head of Growth Morningstar Ventures',
        img: MembersImage3
    },

    {
        name: 'CryptoGorilla',
        post: 'Founder Gorilla Labs',
        img: MembersImage4
    },

    {
        name: 'Michael Liou',
        post: 'Head of Gaming Shima Capital Founder Paladins DAO',
        img: MembersImage5
    },

    {
        name: 'Adam Justice',
        post: 'Head of Marketing Shrapnel',
        img: MembersImage6
    },

    {
        name: 'Jian Tam',
        post: 'Founder BIG3 Ownership Samurai Saga',
        img: MembersImage7
    },

    {
        name: 'Gavin Thomas',
        post: 'Founder Obscu.ro',
        img: MembersImage8
    },

    {
        name: 'Igor K.Founder',
        post: 'Founder DeQuest',
        img: MembersImage1
    },
    {
        name: 'Petr Martynov',
        post: 'Head of Growth Morningstar Ventures',
        img: MembersImage9
    },

    {
        name: 'CryptoGorilla',
        post: 'Founder Gorilla Labs',
        img: MembersImage10
    },

    {
        name: 'Michael Liou',
        post: 'Head of Gaming Shima Capital Founder Paladins DAO',
        img: MembersImage9
    },

    {
        name: 'Adam Justice',
        post: 'Head of Marketing Shrapnel',
        img: MembersImage10
    },

    {
        name: 'Jian Tam',
        post: 'Founder BIG3 Ownership Samurai Saga',
        img: MembersImage11
    },

    {
        name: 'Gavin Thomas',
        post: 'Founder Obscu.ro',
        img: MembersImage11
    },
]

const SocietyFullList = () => {
    const navigate = useNavigate();
    return (
        <div className='society_full_list_wrap'>
            <div className="header">THE WIN-WIN SOCIETY</div>
            <div className="card_wrap">
                {societyCardData.map((data, cardIndex) => {
                    return (
                        <div className="card_box" key={cardIndex}>
                            <SocietyCard
                                name={data.name}
                                post={data.post}
                                img={data.img}
                            />
                        </div>
                    )
                })}
            </div>
            <button onClick={() => navigate('/#members')} className="less_btn">Show less</button>
        </div>
    )
}

export default SocietyFullList