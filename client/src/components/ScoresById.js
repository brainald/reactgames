import React from "react";
import Requests from "./Requests";

class ScoresById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        };
        this.getScoresInList = this.getScoresInList.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ scores: await Requests.get("/scores/" + id) });
    }

    getScoresInList = () => {
        const list = this.state.scores.map((score, index) => {
            console.log(score)
            return (
                <li
                    className="userListItem"
                    key={index}
                >
                {score.points}
                </li>
            );
        });

        return list;
    };

    render() {
        return (
            <div>
                <h1>Scores</h1>
                <ul className="userList">{this.getScoresInList()} </ul>
            </div>
        );
    }
}

export default ScoresById;
