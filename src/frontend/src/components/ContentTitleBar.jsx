import { useNavigate } from 'react-router-dom';

export function ContentTitleBar({ title, onButtonClick }) {
    const navigate = useNavigate();

    function handleButtonClick() {
    navigate('/gallery');
    }

    return (
      <div className="content-box-title">
        {/* <button onClick={handleButtonClick}>Go to Gallery</button> */}
        <p>{title}</p>
        {/* <p>Search bar</p> */}
      </div>
    );
  }
  