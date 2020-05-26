import React, {useState, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getWorldStatus} from "../actions";
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';

export default function WorldCountiesList() {
    const content = useSelector(state => state.worldInfo, shallowEqual); //this hook gives us redux store state
    const dispatch = useDispatch(); //this hook gives us dispatch method
    const data = [
        {x: 1, y: typeof content.worldStatus.cases == "undefined" ? 0 : content.worldStatus.cases},
        {x: 2, y: typeof content.worldStatus.deaths == "undefined" ? 0 : content.worldStatus.deaths},
        {x: 3, y: typeof content.worldStatus.recovered == "undefined" ? 0 : content.worldStatus.recovered},
        {x: 4, y: typeof content.worldStatus.tested == "undefined" ? 0 : content.worldStatus.tested}
    ];

    useEffect(() => {
        dispatch(getWorldStatus());

    }, []);
    console.log(typeof content.worldStatus.cases == "undefined" ? 0 : content.worldStatus.cases)

    return (
        <div>
            <div>Global stats</div>
            <div> {content.worldStatus.cases}</div>
            <div> {content.worldStatus.deaths}</div>
            <VictoryChart domainPadding={20}>
                <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={["cases", "deaths", "recovered", "tested"]}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`$${x / 100000}k`)}
                />
                <VictoryBar
                    data={data}
                    // data accessor for x values
                    x="x"
                    // data accessor for y values
                    y="y"
                />
            </VictoryChart>
        </div>
    )
}
