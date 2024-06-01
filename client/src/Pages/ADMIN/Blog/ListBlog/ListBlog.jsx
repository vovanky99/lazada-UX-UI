import classNames from 'classnames/bind';
import styles from '../Blog.module.scss';
import Button from '~/components/Button';
import Images from '~/components/Images';
import DeleteBlog from '~/api/Blog/DeleteBlog';

const cx = classNames.bind(styles);

export default function ListBlog({ handleDelete = () => {}, P_id, P_title, P_cat, P_img, P_descriptions, P_status }) {
  //delete cat
  const handleDeleteCat = (e) => {
    DeleteBlog(e.target.dataset.id)
      .then((result) => {
        handleDelete(1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <tr className={cx(`tbody-element`)}>
        <td>{P_title}</td>
        <td>
          <div className={cx('avatar')}>
            <Images src={P_img} alt={P_img} />
          </div>
        </td>
        <td>{P_status == 1 ? 'Show' : 'Hide'}</td>
        <td>
          {P_cat.map((d) => (
            <p key={d.id}>{d.name}</p>
          ))}
        </td>
        <td>{P_descriptions}</td>
        {/* <td dangerouslySetInnerHTML={{ __html: P_content }}></td> */}
        <td>
          <div className={cx('toll-edit', 'd-flex flex-row justify-content-center flex-wrap')}>
            <Button gradient_primary type="button" to={`/admin/edit-blogs/${P_id}`}>
              Edit
            </Button>
            <Button data-id={P_id} gradient_danger type="button" onClick={handleDeleteCat}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
