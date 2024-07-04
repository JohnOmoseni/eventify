type EventDetailsProps = {
  params: {id: string}
};

function Events({params}: EventDetailsProps) {
  return (
    <div>
      <div>
        <h1>Github Universe 2023</h1>

        <div className="row-flex gap-4">
          <div className="text-secondary-foreground hover:bg-secondary/80 border-transparent bg-secondary">
            $100
          </div>
          <div className="text-secondary-foreground hover:bg-secondary/80 border-transparent bg-secondary">
            All
          </div>
        </div>
        <p className="text-base">
          <span className="font-medium">by</span>{" "}
          <span>Adrian | JS MAstery</span>
        </p>

        <div>
          <span className="icon"></span>
          <p className="text-sm">Tue, Dec 19, 2023 / 12:25PM - 12:25PM</p>
        </div>
      </div>
    </div>
  );
}

export default Events;
