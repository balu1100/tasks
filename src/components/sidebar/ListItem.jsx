import React from "react";

function ListItem({
  text,
  path,
  length,
  Icon,
  size,
  linkActive,
  setLinkActive,
}) {
  const onClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, null, path);
    let navState = new PopStateEvent("popstate");
    window.dispatchEvent(navState);
    setLinkActive(path);
  };

  return (
    <li
      className={linkActive === path ? "list-item active" : "list-item"}
      onClick={onClick}
    >
      <Icon size={size} />
      <span>{text}</span>
      {length !== 0 ? <span>{length}</span> : ""}
    </li>
  );
}

export default ListItem;
