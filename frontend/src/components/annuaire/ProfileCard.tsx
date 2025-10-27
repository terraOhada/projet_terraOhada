import type { IProfile } from "../../types";

export default function ProfileCard({ profile }: { profile: IProfile }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {profile.photo ? (
            <img
              src={
                "https://img.icons8.com/?size=100&id=98957&format=png&color=EBEBEB"
              }
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src="https://img.icons8.com/?size=100&id=98957&format=png&color=EBEBEB"
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {profile.name}
            </h3>
            <p className="text-blue-600">
              {profile.jobTitle} | {profile.country}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {profile.experience} ans d'expérience
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-medium">Spécialités :</span>{" "}
            {profile.specialties}
          </p>
          {/* cacher cette option pour le moment */}
          {/* <a
            href={`mailto:${profile.email}`}
            className="inline-flex mt-3 text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
          >
            Me Contacter
          </a> */}
        </div>
      </div>
    </div>
  );
}
