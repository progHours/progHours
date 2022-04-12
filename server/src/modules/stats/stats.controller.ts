import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  NotFoundException,
} from "@nestjs/common"
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { UsersService } from "@/modules/users/users.service"
import { StatsService } from "./stats.service"

@Controller("/stats")
@ApiTags("stats")
@UseGuards(IsAuthenticatedGuard)
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly usersService: UsersService
  ) {}

  /**
   * GET /stats/me
   * Returns the statistics of the current user.
   */
  @Get("/me")
  @ApiOperation({ summary: "Returns the statistics of the current user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getStats(@Req() req) {
    const stats = await this.statsService.getUserStats(req.user.id)
    return {
      ...stats,
    }
  }

  /**
   * GET /stats/{username}
   * Returns the statistics of a particular user.
   */
  @Get("/:username")
  @ApiOperation({ summary: "Returns the statistics of a particular user." })
  @ApiOkResponse({ description: "Success." })
  @ApiNotFoundResponse({ description: "Username not found.!" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getStatsByUsername(@Param() params) {
    const user = await this.usersService.getUser({ username: params.username })
    if (!user) {
      return new NotFoundException("User not found!")
    }
    const stats = await this.statsService.getUserStats(user.id)
    return {
      ...stats,
    }
  }
}
