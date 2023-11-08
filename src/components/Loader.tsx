import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className={classes["loader"]}></div>
    </div>
  );
}

export default Loader;
