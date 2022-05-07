export default ({ app }, inject) => {
  const fetchJSON = (path, query) => {
    const { href } = app.router.resolve({ path, query });
    const promise = fetch(href, {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "fetch",
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error(`plugin-error ${res.status} ${res.statusText}`);
    });
    return promise;
  };

  inject("fetchJSON", fetchJSON);
};
