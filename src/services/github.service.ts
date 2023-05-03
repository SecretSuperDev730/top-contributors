import {AxiosRequestConfig} from "axios";

import HttpService from "@/services/http.service";

import PaginationDto from "@/types/dtos/pagination.dto";
import Contributor from "@/types/interfaces/contributor";
import Repository from "@/types/interfaces/repository";

export default class GithubService {

  static listRepositoryContributors(owner: string, repo: string, query: PaginationDto, config?: AxiosRequestConfig): Promise<Contributor[]> {
    return HttpService.get(
      `/repos/${owner}/${repo}/contributors`,
      query,
      config,
    );
  }

  static listUserRepositories(username: string, query: PaginationDto, config?: AxiosRequestConfig): Promise<Repository[]> {
    return HttpService.get(
      `/users/${username}/repos`,
      query,
      config,
    );
  }
}
