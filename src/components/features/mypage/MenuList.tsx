import clsx from 'clsx'
import { ReactElement } from 'react'
import ChevronIcon from '@/assets/icons/arrow_down.svg'

type MenuItem = {
  id: string
  title: string
  /** 항목 오른쪽에 붙는 짧은 상태값 (예: 대기 3곳) */
  hint?: string
  onClick?: () => void
}

interface MenuListProps {
  title: string
  items: MenuItem[]
  className?: string
}

/**
 * 마이페이지의 묶음 목록.
 *
 * 예전에는 제목 아래 텍스트만 나열돼 있어서, 이게 눌리는 것인지 그냥 글인지 알 수 없었고
 * 카드로 된 다른 화면들과도 따로 놀았다. 다른 화면과 같은 흰 카드에 담고, 누를 수 있다는 것을
 * 화살표로 말한다. 항목 사이 구분선은 눌리는 영역의 경계를 겸한다.
 */
const MenuList = ({ title, items, className }: MenuListProps): ReactElement => {
  return (
    <section className={clsx('px-4.5 pt-5', className)}>
      <h2 className="text-b1-semibold px-1 pb-2 text-gray-700">{title}</h2>
      <ul className="overflow-hidden rounded-lg border border-gray-100 bg-white">
        {items.map((item) => (
          <li key={item.id} className="border-b border-gray-100 last:border-b-0">
            <button
              type="button"
              onClick={item.onClick}
              className="text-b1-regular flex w-full items-center gap-2 px-4 py-3.5 text-left text-gray-800 transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:outline-none"
            >
              <span className="grow">{item.title}</span>
              {item.hint && <span className="text-b2-regular text-gray-600">{item.hint}</span>}
              {/* 오른쪽 꺾쇠가 따로 없어 아래 꺾쇠를 돌려 쓴다 */}
              <ChevronIcon className="size-5 shrink-0 -rotate-90 fill-gray-400" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MenuList
