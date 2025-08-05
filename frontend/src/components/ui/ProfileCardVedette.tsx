interface Profile {
  image?: string;
  name: string;
  title: string;
  location: string;
  sponsored?: boolean;
  description: string;
  linkedin?: string;
  email?: string;
}

interface ProfileCardVedetteProps {
  profile: Profile;
}

const ProfileCardVedette = ({ profile }: ProfileCardVedetteProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img
          src={
            profile.image || "https://randomuser.me/api/portraits/women/68.jpg"
          }
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-bold text-lg">{profile.name}</h3>
          <p className="text-blue-600">
            {profile.title} | {profile.location}
          </p>
          {profile.sponsored && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Sponsorisé
            </span>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{profile.description}</p>
      <div className="flex space-x-2">
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        )}
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fas fa-envelope"></i>
          </a>
        )}
      </div>
      <button className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200">
        Voir le profil complet
      </button>
    </div>
  </div>
);

export default ProfileCardVedette;
