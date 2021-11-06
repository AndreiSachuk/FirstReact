import React, {useState} from "react";
import API from "../API";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll())

    const handleUserDelete = userId => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const getBageClasses = (quality) => {
        return `badge m-2 bg-${quality.color}`
    }

    const genereteQualities = qualities => {
        return (
            qualities.map(quality => (
                <span className={getBageClasses(quality)}>{quality.name}</span>
            ))
        )
    }

    const generateRows = users => {
        return users.map(user => (
                <tr  key={user._id}>
                    <th scope="row">{user.name}</th>
                    <td>{genereteQualities(user.qualities)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                        <button onClick={() => handleUserDelete(user._id)} className={"btn btn-danger btn-sm"}>Delete</button>
                    </td>
                </tr>
        ))
    }

    const generateTable = () =>{
        if (users.length) {
            return (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {generateRows(users)}
                    </tbody>
                </table>
            )
        }
    }

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    const generateBadge = (length) => {
        if (length){
            return (
                <span className={'badge m-2 bg-primary'}>{length} {getNoun(length, 'человек', 'человека', 'человек')} {getNoun(length, 'тусанет', 'тусанут', 'тусанут')} с тобой сегодня</span>
            )
        } else {
            return (
                <span className={'badge m-2 bg-danger'}>Никто не тусанет с тобой сегодня</span>
            )
        }
    }

    return (
        <div>
            {<h3>{generateBadge(users.length)}</h3>}
            {generateTable()}
        </div>
    )
}

export default Users
