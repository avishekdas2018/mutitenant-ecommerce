interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>
}
const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { category, subcategory } = await params;
 
  return (
    <div>
      Subcategory page: {category} / {subcategory}
    </div>
  );
}
 
export default SubcategoryPage;