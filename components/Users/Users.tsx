type UsersProps = {
  someProp?: any;
};

const Users = ({ someProp }: UsersProps) => {
  return <div>{someProp}</div>;
};

export default Users;
