import React from "react";
import CardMovie from "./CardMovie";
import { Alert, Row } from "react-bootstrap";
import PaginationComponent from "./Pagination";

const MoviesList = ({ movies, getPage,pageCount}) => {
  return (
    <>
      <Row className="mt-3">
        {movies.length >= 1 ? (
          movies.map((mov) => <CardMovie key={mov.id} mov={mov} />)
        ) : (
          <Alert variant={"info"} style={{ textAlign: "center" }}>
            لا يوجد أفلام الان....
          </Alert>
        )}
        {movies.length >= 1 ? (
          <PaginationComponent getPage={getPage} pageCount={pageCount} />
        ) : null}
      </Row>
    </>
  );
};

export default MoviesList;
