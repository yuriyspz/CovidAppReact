import React, {useState, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCountriesInfo} from "../actions";
import Select from 'react-select'
import {VictoryAxis, VictoryBar, VictoryChart} from "victory";

export default function WorldCountiesInfo() {
    const content = useSelector(state => state.countriesInfo, shallowEqual); //this hook gives us redux store state
    const dispatch = useDispatch(); //this hook gives us dispatch method
    const [selectOption, setSelectOption] = useState({});
    const options = []
    const data = [
        {x: 1, y: selectOption.cases},
        {x: 2, y: selectOption.deaths},
        {x: 3, y: selectOption.recovered},
        {x: 4, y: selectOption.tested}
    ];
    content.countriesStatus.map(x => {
        options.push({value: x.country.name, label: x.country.name})
    })
    useEffect(() => {
        dispatch(getCountriesInfo());
    }, []);
    const handleChange = selectedOption => {
        console.log(`Option selected:`, selectedOption);
        if (selectedOption !== undefined) {
            content.countriesStatus
                .filter(x => x.country.name === selectedOption.value)
                .map(x => setSelectOption({cases: x.cases, deaths: x.deaths, recovered: x.recovered, tested: x.tested}));
        }
    };

    return (
        <div>
            <Select
                options={options}
                onChange={(x) => handleChange(x)}
            />
            {typeof selectOption.cases != "undefined" && <VictoryChart domainPadding={20}>
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
            </VictoryChart>}
                Cases: {selectOption.cases}
                Deaths: {selectOption.deaths}
                Recovered: {selectOption.recovered}
                Tested: {selectOption.tested}

        </div>
    )
}
