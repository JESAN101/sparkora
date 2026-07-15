const EmptyProducts = () => {
  return (
    <div className="text-center py-24">
      <h3 className="font-display text-2xl text-charcoal mb-2">
        No pieces found
      </h3>
      <p className="text-taupe text-sm">
        Try a different search term or category.
      </p>
    </div>
  );
};

export default EmptyProducts;
