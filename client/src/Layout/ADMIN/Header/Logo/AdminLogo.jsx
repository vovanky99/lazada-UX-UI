import Images from '~/components/Images';

export default function AdminLogo({ data }) {
  return (
    <>
      <Images
        src={
          data?.image ||
          `http://res.cloudinary.com/dkruz6j0k/image/upload/v1717239783/upload/images/xyrptnwxffrk5atnfssl.png`
        }
        alt={data?.image}
      />
    </>
  );
}
