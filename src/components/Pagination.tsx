import Button from "./Button";

function Pagination({
  page,
  next,
  prev,
  isPrevDisabled,
  isNextDisabled,
}: {
  page: number;
  next: () => void;
  prev: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-5">
        <Button onClick={prev} disabled={isPrevDisabled}>
          Prev
        </Button>
        <div>Page: {page}</div>
        <Button onClick={next} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </>
  );
}

export default Pagination;
