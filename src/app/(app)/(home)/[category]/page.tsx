interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}


const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  return (
    <div>
      Category Page: {category}
    </div>
  );
}

export default CategoryPage;