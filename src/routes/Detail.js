import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  color: white;
`;

const Bar = styled.div`
  padding: 10px;
  position: fixed;
  top: 0;
`;

const BackHome = styled(Link)`
  color: white;
  font-size: 30px;
  text-decoration: none;
`;

const Detail = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const SuggestionTitle = styled.div`
  position: relative;
  top: -40px;
  left: 10px;
  font-size: 25px;
`;

const Suggestions = styled.div`
  height: 30vh;
  width: 100%;
  display: grid;
  grid-template: 1fr / repeat(6, 1fr);
  grid-gap: 25px;
  position: relative;
  top: -30px;
  left: 10px;
  box-sizing: border-box;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Bar>
        <BackHome to="/">&larr; HOME </BackHome>
      </Bar>
      <Detail>
        <Column>
          <Title>{loading ? "Loading..." : data.movie.title}</Title>
          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Detail>
      <SuggestionTitle>Suggestions</SuggestionTitle>
      <Suggestions>
        {data?.suggestions?.map((m) => (
          <Movie key={m.id} id={m.id} bg={m.medium_cover_image} size="250px" />
        ))}
      </Suggestions>
    </Container>
  );
};
