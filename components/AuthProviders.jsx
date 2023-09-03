export default function AuthProviders({ providers, onGoogleLogin }) {
  return Object.values(providers).map((provider) => (
    <button
      key={provider.id}
      type="button"
      className="black_btn"
      onClick={(e) => onGoogleLogin(provider)}
    >
      Sign In
    </button>
  ));
}
