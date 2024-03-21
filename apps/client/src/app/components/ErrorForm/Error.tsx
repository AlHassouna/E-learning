import { NotFound404, NotFoundContainer, NotFoundLink, NotFoundSubtitle, NotFoundText, NotFoundTitle, NotFoundWrapper } from "../../styles";

export const NotFound: React.FunctionComponent<any> = () => {
  return (
    <NotFoundContainer>
      <NotFoundWrapper>
        <NotFound404 />
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>Oops! Page Not Found</NotFoundSubtitle>
        <NotFoundText>
          Sorry but the page you are looking for does not exist, have been removed, name changed, or is temporarily unavailable
        </NotFoundText>
        <NotFoundLink href="#" type="primary">Back to homepage</NotFoundLink>
      </NotFoundWrapper>
    </NotFoundContainer>
  );
};
