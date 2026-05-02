import UserTypeCard from './UserTypeCard';
import { userTypes } from '@/app/data/home';

export default function UserTypes() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Who Uses This Tool</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userTypes.map((userType, index) => (
          <UserTypeCard key={index} {...userType} />
        ))}
      </div>
    </div>
  );
}
