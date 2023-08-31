import { useRouter } from 'next/router';
import { paramCase } from 'change-case';
import { formattedNum } from '../../utils'
import { PATH_HASHCHADS } from '../../routes/paths';

const Trending = ({ data, title }) => {

  const { push } = useRouter();
  const redirectTokenPage = (tokenId) => {
    push(PATH_HASHCHADS.tokens.view(paramCase(tokenId)));
  };

  return (
    <div className="my-1 md:my-5">
      <div className="py-0.5 px-0.5 md:py-2 md:px-2">
        <div className="flex flex-row justify-between mb-4">
          <span className="flex flex-row font-thin text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-1 hover:stroke-2 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
            {title}
          </span>
          <span className="text-sm text-gray-400">Last 24H</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 mt-2">
          {
            data.slice(0, 6).map((item, idx) => (
              // eslint-disable-next-line react/jsx-key
              <div key={idx} className="flex flex-row justify-between py-1 cursor-pointer" onClick={() => redirectTokenPage(item.id)} >
                <div className="flex flex-row gap-1">
                  <span className="self-center">{idx + 1}</span>
                  {
                    item.iconPath &&
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img src={`https://saucerswap.finance${item.iconPath}`} className="!w-8 h-8 mx-1" />
                  }
                  {
                    item.iconPath === null &&
                    <span alt={''} className="text-3xl" role="img" aria-label="face">🤔</span>
                  }
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-white text-left">{item.coinName}</span>
                    <span className="text-xs text-gray-300 text-left">{`$${item.price}`}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className={item.iconClass === "success" ?
                    "text-xs text-green-weight flex items-center" :
                    "text-xs text-red-weight flex items-center"}
                  >
                    {
                      item.iconClass === "success" &&
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    }
                    {
                      item.iconClass === "danger" &&
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                      </svg>
                    }
                    {`${Number(item.change).toFixed(2)}%`}
                  </div>
                  <div className="text-xs text-gray-300 text-right">{`${formattedNum(item.dailyVolume)} ℏ`}</div>
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </div >
  )
}

export default Trending