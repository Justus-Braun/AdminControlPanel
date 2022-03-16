import './UserStats.css';

const UserStats = function({ identifier, charcount, money, bank }) {
    return (
        <div className='UserStats'>
            <div>Identifier: {identifier}</div>
            <div>Charcount: {charcount}</div>
            <div>Overall Money: {money}</div>
            <div>Overall Bank: {bank}</div>
        </div>
    );
}

export default UserStats;