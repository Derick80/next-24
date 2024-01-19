import Image from "next/image";
import { getUser } from './actions';
import { Card, CardHeader, CardFooter, CardDescription, CardTitle, CardContent } from '@/components/ui/card';

export async function Home () {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }





  return (
    <>
      { user && (

        <Card>
          <CardHeader>
            <CardTitle>{ 'Welcome' }</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{ user.username }</CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>{ user.email }</CardDescription>
          </CardFooter>
        </Card>

      ) }
    </>
  );
}

export default Home;
