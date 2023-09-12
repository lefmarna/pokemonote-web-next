import styled from '@emotion/styled'

export const SH1 = styled.h1`
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;
  text-align: center;
`

export const SH2 = styled.h2`
  position: relative;
  background: #1976d2;
  box-shadow: 0px 0px 0px 5px #1976d2;
  border: dashed 2px #dee2e6;
  padding: 0.4em 0.5em;
  color: white;
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;

  &::after {
    position: absolute;
    content: '';
    left: -7px;
    top: -7px;
    border-width: 0 0 15px 15px;
    border-style: solid;
    border-color: #fff #fff #145ca4;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
`

export const SH3 = styled.h3`
  padding: 15px;
  color: #191919;
  border-bottom: solid 1px #d8d8d8;
  border-left: solid 4px #1976d2;
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;
`

export const SH4 = styled.h4`
  position: relative;
  padding: 15px 5px;
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    content: '';
    background: repeating-linear-gradient(
      -45deg,
      #1976d2,
      #1976d2 2px,
      #d8d8d8 2px,
      #d8d8d8 4px
    );
  }
`
