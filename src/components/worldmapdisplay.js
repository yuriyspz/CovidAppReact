import React, {useState, useEffect} from 'react';
import Chart from "react-google-charts";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCountriesInfo, getStatsByDate} from "../actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function WorldMapInfo() {
    const content = useSelector(state => state.countriesInfo, shallowEqual); //this hook gives us redux store state
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch(); //this hook gives us dispatch method
    const data = [
        ['Country', 'Cases', 'Deaths'],
    ]
    content.countriesStatus.map(x => {
            if (x.country.name === 'USA') {
                data.push(['United States', x.cases, x.deaths]);
            } else {
                data.push([x.country.name, x.cases, x.deaths])
            }
        }
    )

    useEffect(() => {
        console.log(startDate.getTime()/1000)
        dispatch(getStatsByDate(Math.round(startDate.getTime()/1000)));
        //dispatch(getCountriesInfo());
    }, []);
    return (
        <div>
            {}
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="GeoChart"
                data={data}
                options={{
                    colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
                    backgroundColor: '#81d4fa',
                    datalessRegionColor: '#f8bbd0',
                    defaultColor: '#f5f5f5',
                }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
                rootProps={{'data-testid': '1'}}
            />
            <DatePicker
                selected={startDate}
                onChange={date => {dispatch(getStatsByDate(Math.round(date.getTime()/1000))); setStartDate(date)}}
                timeIntervals={15}
                dateFormat="MMMM d, yyyy"
            />
        </div>
    )
}
