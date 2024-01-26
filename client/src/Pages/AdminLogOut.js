function AdminLogOut({ navigate }) {
    fetch('/api/admin/logout',{method:"POST"})
        .then(res => res.json())
        .then(res => {
            navigate('/')
        })
        .catch(err => console.log(err))
}

export default AdminLogOut;