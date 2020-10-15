import React, { useState, useEffect, useContext } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employees.css"


export const EmployeeDetail = (props) => {
    const { locations, getLocations } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)
    const { animals, getAnimals } = useContext(AnimalContext)

    const [employee, setEmployee] = useState({})
    const [location, setLocation] = useState({})
    const [animal, setAnimals] = useState([{name:{}}])

    useEffect(() => {
        getLocations()
            .then(getEmployees)
            .then(getAnimals)
    }, [])

    useEffect(() => {
        const employee = employees.find(e => e.id === parseInt(props.match.params.employeeId)) || {}
        setEmployee(employee)
    }, [employees])

    useEffect(() => {
        const location = locations.find(l => l.id === employee.location_id) || {}
        const animal = animals.filter(a => a.location_id = location.id) || {}
        setAnimals(animal)
        setLocation(location)
    }, [employee])

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div>Currently working at { location.name } {location.address}</div>
            <div>
                {
                (animal === null)
                    ? "Not assigned to an animal"
                    : `Currently taking care of ${animal.map(a => a.name).join(", ")}`
                }
            </div>
        </section>
    )
}