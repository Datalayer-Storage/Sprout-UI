import Styled from 'styled-components';
 const NavigationBar: React.FC = () => {
     
  const NavBarBox = Styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;

  return(
    <>
      <div>
        
        This is the navigation bar
      </div>
    </>
  );
 }

 export { NavigationBar }