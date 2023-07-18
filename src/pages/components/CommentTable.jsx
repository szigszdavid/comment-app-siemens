import PropTypes from "prop-types";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { useState } from "react";

CommentTable.propTypes = {
  comments: PropTypes.array,
  isLoaded: PropTypes.bool,
};

export default function CommentTable({ comments, isLoaded }) {
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState("");
  const sortOptions = [
    { label: "Sort by Post ID ascending", value: "postId" },
    { label: "Sort by Post ID descending", value: "!postId" },
    { label: "Sort by Name ascending", value: "name" },
    { label: "Sort by Name descending", value: "!name" },
    { label: "Sort by E-mail ascending", value: "email" },
    { label: "Sort by E-mail descending", value: "!email" },
  ];

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const header = () => {
    return (
      <Dropdown
        options={sortOptions}
        value={sortKey}
        optionLabel="label"
        placeholder="Sort by Post ID ascending"
        onChange={onSortChange}
        className="w-full sm:w-14rem"
      />
    );
  };

  const itemTemplate = (comment) => {
    return (
      <div className="border-solid border-round border-1 pl-2 pr-2">
        <h4 className="bold">{comment.name}</h4>
        <div className="flex justify-content-evenly">
          <div className="flex align-items-center">
            <i className="pi pi-user pr-1"></i>
            <p>{comment.postId}</p>
          </div>
          <div className="flex align-items-center">
            <i className="pi pi-at pr-1"></i>
            <p>{comment.email}</p>
          </div>
          <div className="flex align-items-center">
            <i className="pi pi-calculator pr-1"></i>
            <p>{comment.wordCount}</p>
          </div>
        </div>
        <div className="flex align-items-top">
          <div className="flex align-items-center pr-2">
            <i className="pi pi-comment pr-1"></i>
            <p>:</p>
          </div>
          <p>{comment.body}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card w-5">
        <Card>
          {isLoaded ? (
            <DataView
              value={comments}
              itemTemplate={itemTemplate}
              paginator
              rows={2}
              header={header()}
              sortField={sortField}
              sortOrder={sortOrder}
            />
          ) : (
            <ProgressSpinner className="w-5" />
          )}
        </Card>
      </div>
    </>
  );
}
