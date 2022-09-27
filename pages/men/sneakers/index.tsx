import type { NextPage } from 'next'
import { BsFilter } from "react-icons/bs";
import { IconContext } from "react-icons";
import Pagination from '../../../components/Pagination';

type MenSneakersPageProps = {
  result: any[]
}

const MenSneakers: NextPage<MenSneakersPageProps> = ({ result }) => {

  console.log(result)

  return (
    <div className='px-2'>
      <IconContext.Provider value={{ className: "global-class-name h-8 w-8", }}>
        <button className='capitalize flex justify-center align-center bg-st my-4 py-1 outline-none border border-slate-800 rounded block w-full'>
          <BsFilter/>
          <span className='text-xl font-medium'>Filter</span>
        </button> 
      </IconContext.Provider>
      {/* <Cart result={result}/> */}
      <Pagination data={result} title="" pageLimit={2} dataLimit={45}/>
    </div>
  )
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  let myHeaders = new Headers();
  myHeaders.append("Cookie", "AkamaiFeatureToggle=050b85.-1_20eb8a.-1_2910a4.1_5eede7.-1_5f788d.-1_8ffa99.-1_9fca73.-1_aec899.-1_d47781.-1_dd1a3b.1_fdbb7a.0; BISessionId=8bb74695-cdc9-d4a6-08e7-e69ffdd918a4; BIcookieID=cbaa82aa-0468-46d9-a9f7-cb49b64a2ec9; _abck=7E38B3A1ED0DD923F8803324F8CAA789~-1~YAAQRarOF9LmgjuDAQAAoFhYawj45Qsat9fukIi1dE/CtGYMlr++QwmrWXUIiftzlZ7QxPv5p+NzN8EiP/4RKVHfjxZGABqZn4SyVYrhMRpRfu1sK8se+1tEfgjIXl6tQVc7pP9VuK7ippOr+yKo/2/xphdK3A7VyIkTosrzLeojQiVe3OuZOJa+jDQBUulZfU96BMX0GVLlLMX/YjGQDf4KQcFuKGQ8E4I076rkk3D+pjfZQKzGMvn72T0rf+T9zHSHMt1mFJvMsT6QQoJQj0pJoqAFoQsDw6PSPzeKB9i4/wyHE018XguLWc8S6MoOkz+3FetxXbDYAHnuq1C01kxunLros5PF9t9euzV/W+6qXNuv3yt/Jdl4ebg3Vj0k26CpK+zTabln~-1~-1~-1; _l=0; ak_bmsc=69B299C6D7B4FA2A9E0162192F5961A1~000000000000000000000000000000~YAAQRarOF9PmgjuDAQAAoFhYaxE9AUI0wXyBxO6Prsc5mwRTBu/QwWhcwKoI///+CUT+S/Puav6+OdYfM0nqVskZ40ff9/sc3m3z6vldP3a0AkaZnxOODJFgjh6nDshDxoaOZAdQM86gna30R5YIdZVGbh363t9FmHy/MCHvE5mkVAYC/ggEy0vnqweQ0E52YV6TUlGg2vOimwRP0NpAQENRYT5WuAAOoIdaSqM21hU1TRmL8mH554qTOCCyUu1wmJzbj31Fuotga6jfP+gKwog7FpNddFw3MtD26CdFH3rCd/GPhPa54WCxL+zjiEjIYt7K6Msx74XCTMnn4kqYaGsHJ9/8OJ6LK/nM2uQBBFivmp2TJXeL8J8b9jG4eA==; bm_sz=B767D820036E4015D996F00DAD4E2C3E~YAAQRarOF9TmgjuDAQAAoFhYaxEHksJLPj7yTX6A76FnABBsiy00ANKVCVLBAP5ws72q7unS4NyuAdusfjBfnrfGaMeKyq2cBmxcshWm/+OvMCcGQf0U+dt0epm5KD84qDbSYY5wXMB3zA+bJZGYWQfq/RloqXU8IL5FmFLN4p4Q7L50i3+kEjl3kKkGGvG08IcF4BJg0IXa/8ZKbAdeFYUoak+1D6+Eu36KV5afJ5OfNDfZtM/7D2MbnagkhGi0CkPlA84r+VwkddoAqVwoZ0Ks1WoQXiZz5HtKYFlgY3964Nty5Q==~3160112~3355184; ckm-ctx-sf=%2Fng; ff_navroot_history=141259; ffcp=a.1.0_f.1.0_p.1.0_c.1.0; ub=B40C7C813198644FE78245D827900629; __Host-CSRF-REQUEST-TOKEN=CfDJ8BZV7bSK_gVKoJ5_tFR15T7IDMeUUB-P3mw8ocFo_l3tmX4O6WzdmlJCAh7wIq5IuZTsi7J765a1CVNMTwUdi_emq47AmPvd2bvx3ULXZt_ZRJEWmVS7ZmqGWQ0XQFSShqcjarXMr1VkKyyraDZdlHvS0zp5jxYd06TnUQ6kfCXPLFtHX7CreV60O5kpqtcMMQ; __Host-CSRF-TOKEN=CfDJ8BZV7bSK_gVKoJ5_tFR15T5MCCXStkA4Vrvn1Sx2nbwh5Ll4CBuJbIKJCN54hFRfEevMq4VqEAAK6h26Q_t-1FIo_t1mxz704_pLdJO0YoCIBUhe7TBtfVFOdGI4UqPqfcy1ITd4J_g2J6kxszXRzUk; __Host-FF.AppCookie=CfDJ8BZV7bSK_gVKoJ5_tFR15T76lhm9g-Q1R0QBBkpzdQlasTwVcDXlIOE6ZMSPjuii5jvL2NPQq5uOSumUxsoLWNa-wMtfuRrzezyF3mImKkxb48uovGjpU3FHeYsz-S0GEXcShhVhT0sQNiJxaoW5mMKVyGtx1WfWpr10_auj9se93fq2TrlQRvY00hsi9kQDyHwitBsk3RVI01ZR1ZNWEbJdcaZuFapO6Vra6pO1ITlmfXs5aTAT4f8s1W_I46NGOj-uNoF8yfhOUCi8OkPW_5zAWcZS6V-qSsn6IuIw4G4ca64KZ9-cm7NjauvIjHTi1G1QsoPdaOc60wb5Sl3Zjk8; __Host-FF.AppSession=CfDJ8BZV7bSK%2FgVKoJ5%2FtFR15T5OOAq4T9JPXBRPqKPkZRANVmGsAgKK0hdqBVmvsA62E6q84%2BEqa3Kd3wuK9yUSo93UfDIGT81bFPq1QwfLNT53s5lRJkY5FHhSye0FnWPGQF94jDcLUM8c4f0qKaXi2gnLgVPiUmdild0lKGDKNpzx");


 

  let requestOptions: RequestInit | undefined = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch("https://www.farfetch.com/ng/plpslice/listing-api/products-facets?page=1&view=89&sort=3&scale=282&pagetype=Shopping&rootCategory=Men&pricetype=FullPrice&c-category=137174", requestOptions)
  const data = await res.json()
  const result = data.listingItems.items

  // Pass data to the page via props
  return { props: { result } }
}

export default MenSneakers