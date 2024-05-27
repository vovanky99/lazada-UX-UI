function Error() {
  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: '#Ffffff', width: '100%', height: '100vh', boxShadow: '0px 1px 3px 0px #ccc' }}
    >
      <div
        style={{
          backgroundImage:
            'url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shopmicrofe/6202cbd8f3f78638666d634bf423129b.png)',
          width: '120px',
          height: '120px',
          backgroundSize: 'contain',
        }}
      ></div>
      <p className="d-block fs-2 text-black">This shop failed to load. Please tap back and try again.</p>
    </section>
  );
}

export default Error;
