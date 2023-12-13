import { Link } from 'react-router-dom';

function MenuChildren({ index, data }) {
  return (
    <div>
      <ul>
        <li key={index}>
          <Link to={data.path}>{data.title}</Link>
          {data.parent_id == data.id && <MenuChildren index={index} data={data} />}
        </li>
      </ul>
    </div>
  );
}

export default MenuChildren;
