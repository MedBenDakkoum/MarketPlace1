function LogOut({ navigate }) {
    fetch('/auth/logout' ,{ method:"POST"})
        .then(res => res.json())
        .then(res => {
            navigate('/')
        })
        .catch(err => console.log(err))
}

export default LogOut;