function AdminLogOut({ history }) {
    fetch('/admin/logout')
        .then(res => res.json())
        .then(res => {
            history.push('/')
        })
        .catch(err => console.log(err))
}

export default AdminLogOut;