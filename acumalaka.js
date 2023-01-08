{
  data ? (
    data.map((item) => (
      <div className="col-3 mt-5 d-flex flex-column">
        <img
          src={item.photo}
          style={{ height: "300px", width: "300px" }}
          className="rounded"
          onClick={() => Router.push(`/recipes/${item.id_recipes}`)}
        />
        <h6 style={{ marginTop: "-40px", marginLeft: "20px" }} className="">
          {item.recipes_name}
        </h6>
      </div>
    ))
  ) : (
    <h3>Loading</h3>
  );
}
