"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";

type LoaderProps = {
  loading?: boolean;
  label?: string;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  spinner?: ReactNode;
  render?: () => React.ReactNode;
};

const FallbackLoader = ({
  loading,
  setLoading,
  spinner,
  label,
  render,
}: LoaderProps) => {
  if (!loading) return null;

  return (
    <div
      className="pointer-events-auto absolute inset-0 grid w-full select-none place-items-center"
      style={{ zIndex: 999 }}
    >
      {render ? (
        render()
      ) : (
        <>
          {spinner && spinner}
          {label ?? "Loading..."}
        </>
      )}
    </div>
  );
};

export default FallbackLoader;
