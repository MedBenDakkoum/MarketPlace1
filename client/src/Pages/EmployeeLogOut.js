function EmployeeLogOut({ navigate }) {
    fetch('/api/employee/logout',{method:"POST"})
        .then(res => res.json())
        .then(res => {
            navigate('/')
        })
        .catch(err => console.log(err))
}

export default EmployeeLogOut;