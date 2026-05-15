const UserProfile = async ({ params }: { params: Promise<{ id: any }> }) => {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-slate-100 p-8 font-sans">
      <section className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <h1 className="mb-4 text-3xl font-semibold text-slate-900">
          User Profile{" "}
          <span className="bg-orange-400 p-2 text-white rounded-sm">{id}</span>
        </h1>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-18 w-18 items-center justify-center rounded-full bg-sky-100 text-2xl font-semibold text-sky-600">
            JS
          </div>
          <div>
            <p className="m-0 text-lg font-semibold text-slate-900">
              Jordan Smith
            </p>
            <p className="mt-1 text-slate-500">Full Stack Developer</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between text-slate-700">
            <span>Email</span>
            <span>jordan.smith@example.com</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Location</span>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Member since</span>
            <span>March 2022</span>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-slate-600">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">About</h2>
          <p className="m-0 leading-7">
            Passionate about building thoughtful web applications with modern
            React and Next.js. Enjoys working on clean user experiences and
            responsive interfaces.
          </p>
        </div>

        <button
          type="button"
          className="mt-7 w-full rounded-2xl bg-blue-600 px-4 py-3 text-md font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
        >
          Edit Profile
        </button>
      </section>
    </main>
  );
};

export default UserProfile;
