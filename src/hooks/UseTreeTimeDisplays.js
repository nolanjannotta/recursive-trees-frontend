import {useEffect, useState} from 'react'




export function UseTreeTimeDisplays(nextHarvest, percentGrown) {
    const [timeDisplay, setTimeDisplay] = useState({
        isGrown: false,
        time: 0,
        date: "",
        unit: ""
    });


    const twoWeeks = 60*60*24*14

    const oneDay = 60*60*24
    const hour = 60*60
    const minute = 60

    function calculateBestUnit(secondsUntilNextHarvest) {
        if(secondsUntilNextHarvest > oneDay) {
            return {time: (secondsUntilNextHarvest/oneDay).toFixed(2), unit: "days"}
        }
        if(secondsUntilNextHarvest < oneDay && secondsUntilNextHarvest > hour) {
            return {time: (secondsUntilNextHarvest/hour).toFixed(2), unit: "hours"}
        }
        if(secondsUntilNextHarvest < hour && secondsUntilNextHarvest > minute) {
            return {time: (secondsUntilNextHarvest/minute).toFixed(2), unit: "mins"}
        }
        return {time: secondsUntilNextHarvest.toFixed(), unit: "sec"}

    }


    useEffect(()=>{
        
        if(percentGrown == 10000) {
            // if its 100% grown
            let bestUnits = calculateBestUnit(nextHarvest - Date.now()/1000)
            setTimeDisplay({
                isGrown: true,
                time: bestUnits.time,
                date: new Date(nextHarvest * 1000).toLocaleDateString('en-us',{month: "numeric", day: "numeric", year: "2-digit"}),
                unit: bestUnits.unit
            })


        }
        else {
             // if its not 100% grown, which would be 2 weeks before the next harvest

             let bestUnits = calculateBestUnit(nextHarvest - twoWeeks - Date.now()/1000)
             setTimeDisplay({
                 isGrown: false,
                 time: bestUnits.time,
                 date: new Date((nextHarvest - twoWeeks) * 1000).toLocaleDateString('en-us',{month: "numeric", day: "numeric",year: "2-digit"}),
                 unit: bestUnits.unit
             })

        }

    },[nextHarvest, percentGrown])

    return timeDisplay

}

