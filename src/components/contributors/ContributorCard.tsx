import Link from "next/link";
import {FC} from "react";

import Button from "@/components/common/Button";
import NextImage from "@/components/common/NextImage";

import Contributor from "@/types/interfaces/contributor";

export interface ContributorCardProps {
  contributor: Contributor;
}

const ContributorCard: FC<ContributorCardProps> = ({
  contributor,
}) => {
  return (
    <div className="relative flex flex-col h-full bg-white rounded-[10px] px-7 pt-7 pb-6" data-testid="contributor-card">
      <div className="flex items-end">
        <div className="bg-light p-1.5">
          <img
            className="w-15 h-15"
            src={contributor.avatar_url}
            alt=""
            data-testid="image"
          />
        </div>
        <span className="text-gray text-xs ml-4">@github</span>
      </div>
      <h6 className="mt-4" data-testid="username">{contributor.login}</h6>
      <p className="text-gray mb-4" data-testid="contributions">{contributor.contributions} commits</p>
      <div className="text-center mt-auto">
        <Link href={`/contributors/${contributor.login}`} data-testid="view-repositories-button">
          <Button>View Repositories</Button>
        </Link>
      </div>

      {contributor.location && (
        <NextImage
          className="absolute top-7 right-6 cursor-pointer"
          src="/images/compass.png"
          width={32}
          height={32}
          alt=""
        />
      )}
    </div>
  );
};

export default ContributorCard;
