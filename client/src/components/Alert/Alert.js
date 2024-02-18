import './Alert.css'

function Alert({msg="Message here", type="normal"}) {
    return (
        <div className='alert-pop-message-container'>
            <div className='alert-pop-msg' style={type=="success"? {backgroundColor:"#00A724"} : type=="fail"? {backgroundColor:"#E62929"} : {backgroundColor:"#006DD3"}}>
                <p>{msg}</p>
            </div>
        </div>
    )
}

export default Alert;