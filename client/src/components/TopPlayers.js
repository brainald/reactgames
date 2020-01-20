import React from "react";
import Requests from "./Requests";

class TopPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.getUsersInList = this.getUsersInList.bind(this);
    }

    async componentDidMount() {
        this.setState({ users: await Requests.get("/scores") });
    }

    getUsersInList = () => {
        const list = this.state.users.map(user => {
            return (
                <li
                    className="userListItem"
                    key={user.email}
                >
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </li>
            );
        });

        return list;
    };

    render() {
        return (
            <div>
                <h1>Users</h1>
                <ul className="userList">{this.getUsersInList()} </ul>
            </div>
        );
    }
}

export default TopPlayers;
