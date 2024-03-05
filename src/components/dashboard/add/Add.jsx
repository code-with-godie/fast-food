import "./add.scss";
import { logout } from '../../../context/userSlice'
import { useDispatch } from 'react-redux'
const Add = (props) => {
  const dispatch = useDispatch();
  const handleClick = ()=>{
    if(props.confirm){
      dispatch(logout())
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    props.setOpen(false)
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        {props.confirm ?  <h1> confirm that you want to logout?</h1>: <h1>Add new {props.slug}</h1>}
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
            {props.children}
          <button onClick={handleClick} >{props.confirm ? 'Click to logout' :'Send'}</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
