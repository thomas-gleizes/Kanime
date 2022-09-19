import {
  BadRequestException,
  Body,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  ParseNumberPipe,
  Post,
  Query,
  ValidationPipe,
} from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { animeModel, postModel } from 'models';
import { postsMapper } from 'mappers';
import HttpStatus from 'resources/HttpStatus';
import { errorMessage } from 'resources/constants';
import { AnimePostDto, QueryParamsDto } from 'dto';
import { GetSession, AuthGuard } from 'decorators';

class AnimePostHandler extends ApiHandler {
  @Get()
  async show(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) params: QueryParamsDto
  ) {
    const anime = await animeModel.isExist(id);

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    const posts = await postModel.findByAnimes(id, params);

    return { posts: postsMapper.many(posts) };
  }

  @Post()
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Query('id', ParseNumberPipe) id: number,
    @Body(ValidationPipe) body: AnimePostDto,
    @GetSession() session
  ) {
    if (!(await animeModel.isExist(id)))
      throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    const post = await postModel.create({
      userId: session.user.id,
      animeId: id,
      content: body.content,
      parentId: body.parentId,
    });

    return { post: postsMapper.one(post) };
  }

  @Delete()
  @AuthGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Query('id', ParseNumberPipe) id: number, @GetSession() session) {
    const post = await postModel.findByAnimeIdAndUserId(id, session.user.id);

    if (!post) throw new NotFoundException('Post not found');

    if (post.user_id !== session.user.id)
      throw new BadRequestException('You are not allowed to delete this post');

    await Promise.all([postModel.deleteParent(post.id), postModel.delete(post.id)]);
  }
}

export default apiHandler(AnimePostHandler);
