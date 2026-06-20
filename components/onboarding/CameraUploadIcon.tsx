function CameraUploadIcon() {
  return (
    <span className="relative inline-flex">
      <svg
        aria-hidden
        viewBox="0 0 32 28"
        className="h-7 w-8 text-brand-ink sm:h-8 sm:w-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 8.5H8.2L10.4 5.5H21.6L23.8 8.5H28C29.1 8.5 30 9.4 30 10.5V23.5C30 24.6 29.1 25.5 28 25.5H4C2.9 25.5 2 24.6 2 23.5V10.5C2 9.4 2.9 8.5 4 8.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16.5" r="5.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="absolute -bottom-0.5 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-info text-[10px] font-semibold leading-none text-white">
        +
      </span>
    </span>
  );
}

export default CameraUploadIcon;
